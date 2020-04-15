create Table user (
 id bigint unsigned not null auto_increment,
  primary key(id),
  username varchar(255),
  email varchar (255),
  password varchar(255),
  first_name varchar (255),
  last_name varchar (255),
  role ENUM('admin','member') not null default 'member',
  created_at Datetime default current_timestamp()
);

create Table category(
 id bigint unsigned not null auto_increment,
  primary key(id),
  type_name varchar(255)
);
create Table sub_category(
 id bigint unsigned not null auto_increment,
  primary key(id),
  name varchar(255),
  category_id bigint unsigned not null,
  foreign key(category_id) references category(id)
);

create Table question (
 id bigint unsigned not null auto_increment,
    primary key(id),
    title varchar(255),
    text varchar(255),
    user_id bigint unsigned not null,
    category_id bigint unsigned not null,
    foreign key(user_id) references user(id),
    foreign key(category_id) references category(id)
 );
create Table answer(
    id bigint unsigned not null auto_increment,
    primary key(id),
    text varchar (255),
    is_correct boolean default false,
    user_id bigint unsigned not null,
    question_id bigint unsigned not null,
    foreign key(user_id)references user(id),
    foreign key(question_id)references question(id)
 );
create Table vote(
 id bigint unsigned not null auto_increment,
  primary key(id),
  type Enum('upvote','neutral','downvote') not null default 'neutral' ,
  user_id bigint unsigned not null,
  foreign key(user_id) references user(id)
  );