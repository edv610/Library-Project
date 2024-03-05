create table autores (autor_id serial primary key, nome varchar(50));

create table editores (editora_id serial primary key, nome varchar (50), localizacao varchar (50));

create table livros (livro_id serial primary key, titulo varchar (50), ano_publicacao date, 
autor_id integer references autores(autor_id),
editora_id integer references editores(editora_id));

create table usuarios (user_id serial primary key, nome varchar(30), senha varchar(50))