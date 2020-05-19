create Table notification (
 id bigint unsigned not null auto_increment,
    primary key(id),
    notification_text varchar(255),
    user_id bigint unsigned not null,
    type varchar(255),
    foreign key(user_id) references user(id)

);

create Table notify_user(
    id bigint unsigned not null auto_increment,
    primary key(id),
    user_id bigint unsigned not null,
    notification_id bigint unsigned not null,
    shown boolean default false,
    foreign key(user_id) references user(id),
    foreign key(notification_id) references notification(id)

)