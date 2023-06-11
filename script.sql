drop table answers;
drop table questions;
drop table users;
drop table categories;

create table categories
(
    num_category  integer
        constraint categories_pk
            primary key autoincrement,
    category_name varchar(15) not null
);

create unique index categories_category_id_uindex
    on categories (num_category);

create unique index categories_category_name_uindex
    on categories (category_name);

create table users
(
    user_id   integer
        constraint users_pk
            primary key autoincrement,
    name      varchar(20)  not null,
    firstname varchar(20)  not null,
    email     varcahr(100) not null,
    password  varchar      not null,
    admin     integer
);

create table questions
(
    question_id  integer
        constraint questions_pk
            primary key autoincrement,
    user_id      integer      not null
        references users,
    title        varchar(250) not null,
    question     varchar      not null,
    report       integer,
    right_answer integer,
    num_category integer      not null
        references categories,
    date         timestamp default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);

create table answers
(
    answer_id   integer
        constraint answers_pk
            primary key autoincrement,
    user_id     integer      not null
        references users,
    question_id integer      not null
        references questions,
    subject     varchar(250) not null,
    answer      varchar      not null,
    report      integer,
    date        timestamp default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')) not null,
    certified   integer
);

create unique index answers_answer_id_uindex
    on answers (answer_id);

create unique index questions_question_id_uindex
    on questions (question_id);

create unique index users_email_uindex
    on users (email);

create unique index users_user_id_uindex
    on users (user_id);

INSERT INTO users (user_id, name, firstname, email, password, admin)
VALUES (1, 'Luca', 'Nicolas', 'luca.admin@enf.com', '$2b$10$Dtkt1usq4wOP.E9dvOxVlOf7Yv5m9XGPADtWZosbP3myHU3UidSPO', 1),
       (22, 'o', 'ch', 'och@vinci.be', '$2b$10$GtZBo83JGa/oBR1A8WMmguYTzKW1d6rsFb.rWiR./OXcnKLXD8XA.', 0),
       (23, 's', 'eb', 'seb@vinci.be', '$2b$10$DJ2H8PwsaWDMthDGpq02We25XN8aDBXr2bW.5uYB2p8mEmmwLIdWm', 0),
       (24, 's', 'tef', 'stef@vinci.be', '$2b$10$VHVXyuy.H53NbrCuw5JG8OtSnkTlpzACzGiYX7HTaw7z5VOdk6dKi', 1),
       (25, 'l', 'le', 'lle@vinci.be', '$2b$10$BnbH917brkGO7a7iEXKRbupmAvNyTGy9PmAlbrqlywxMOhQMKqB8e', 0);

INSERT INTO categories (num_category, category_name)
VALUES (1, 'Java'),
       (2, 'JavaScript'),
       (3, 'Python'),
       (4, 'SQL'),
       (5, 'HTML'),
       (6, 'CSS'),
       (7, 'Swift'),
       (8, 'C#'),
       (9, 'PHP');

INSERT INTO questions (question_id, user_id, title, question, report, right_answer, num_category, date)
VALUES (52, 22, 'Error Not Found', 'J''ai une erreur Not Found quand je vais sur http://localhost:3000', 0, 0, 2, '2022-05-06 09:00:00'),
       (53, 22, 'Php report', 'fu... PHP', 1, 0, 9, '2022-05-06 09:00:00'),
       (54, 24, 'module not found', 'J''ai une erreur quand je fais un npm start ", la catégorie est" JavaScript', 0, 0, 2, '2022-05-06 09:00:00'),
       (55, 24, 'Php property error', 'Error accessing object property $id', 0, 0, 9, '2022-05-06 09:00:00'),
       (56, 24, 'View not found', 'Je n''arrive pas à afficher ma vue index.js', 0, 1, 2, '2022-05-06 09:00:00'),
       (57, 25, 'Js report', 'Comment debugger en JS ', 1, 0, 2, '2022-05-06 09:00:00');

INSERT INTO answers (answer_id, user_id, question_id, subject, answer, report, date, certified)
VALUES (12, 22, 56, 'View not found', ' Tu dois créer un router', 0, '2022-05-06 09:00:00', 0),
       (13, 22, 55, 'Php property error ', ' fu.. Php 1', 1, '2022-05-06 09:00:00', 0),
       (14, 22, 55, 'Php property error', ' fu.. Php 2', 1, '2022-05-06 09:00:00', 0),
       (15, 22, 55, 'Php property error', ' il faut désérialiser l''objet', 1, '2022-05-06 09:00:00', 0),
       (16, 22, 52, 'Error not found', ' Error not found réponse', 0, '2022-05-06 09:00:00', 0),
       (17, 25, 56, 'View not found', 'Tu dois vérifier l''existance du fichier vue et ainsi que son chemin ', 0, '2022-05-06 09:00:00', 1),
       (18, 24, 53, 'Php report', 'Php report réponse 1 ', 0, '2022-05-06 09:00:00', 0),
       (19, 24, 53, 'Php report', ' Php report réponse 2', 0, '2022-05-06 09:00:00', 0);





