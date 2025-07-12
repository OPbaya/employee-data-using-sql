import db from '../config/sql_db'

export const table = await db.execute(`
    create table users(
    id int auto_increment primary key,
    username varchar(100) not null,
    email varchar(100) not null unique
    )`
);