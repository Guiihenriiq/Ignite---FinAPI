const express = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());

const customers = [];

//Middleware
function verifyIfExistsAccountCPF(request,response, next) {
    const {cpf} = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({ error: "Customer not found!"
        })
    }
    request.customer = customer;

    return next();
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation)=>{
        if(operation.type === 'credit'){
            return acc + operation.amount
        } else {
            return acc - operation.amount;
        }
    },0)
    return balance;
}


app.post('/account', (request, response) => {
    const {cpf, name} = request.body;
    const customersAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );
    if(customersAlreadyExists){
        return response.status(400).json({error: "Customer already exists!"});
    }
    
    customers.push({
        cpf,
        name,
        id:uuidv4(),
        statement: [{description: "Initial deposit", amount: 0, type: "credit"}]
    }) ;
    
    return response.status(201).json(customers);
});



app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;

    return response.json(customer.statement);
}
);

app.post("/deposit", verifyIfExistsAccountCPF,(request,response) =>{
    const {description, amount} = request.body;

    const {customer} = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type:"credit",   
    };
    customer.statement.push(statementOperation);

    return response.status(201).send("👌");
});

app.post("/withdraw",verifyIfExistsAccountCPF,getBalance,(request,response) =>{
    const { amount } = request.body;
    const {custumer} = request;

    const balance = getBalance(customer.statement);

    if(balance < amount) {
        return response.status(400).json({error: "Insufficient funds!"})
    };

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit",
    };
    custumer.statement.push(statementOperation)
    return response.status(201).send("🤑💵💱");
})

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;
    const {date} = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(
        (statement) => 
            statement.created_at.toDateString() === 
        new Date(dateFormat).toLocaleDateString()
    );

    return response.json(statement);
}
);
app.put('/account', (request, response) => {
    const {name} = request.body;
    const {customer} = request;

    customer.name = name;

    return response.status(201).json(customer);     
}
);
app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;

    return response.json(customer);
}
);
app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;

    //Ultilizando o splice para remover o cliente
    customers.splice(customer, 1);

    return response.status(200).json(customers);
}
);
app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;

    const balance = getBalance(customer.statement);

    return response.json(balance);
}
);
   
app.listen(3031)
console.log("Server is running on port 3031")