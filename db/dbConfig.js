import { Sequelize } from "sequelize";

const sequelize = new Sequelize('dummyJson','root','root',
    {dialect: 'mysql',host: 'localhost', logging: console.log,}
);

sequelize.authenticate().then(() => {
    console.log("Connection success");
}).catch((err) => {
    console.log(err)
})

export default sequelize;





