create Table preference(
    id bigint unsigned not null auto_increment,
    primary key(id),
    text varchar (255),
    priority int unsigned not null,
    user_id bigint unsigned not null,
    category_id bigint unsigned not null,
    foreign key(user_id) references user(id),
    foreign key(category_id) references category(id)

)