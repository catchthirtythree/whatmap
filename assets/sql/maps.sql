create table maps(
    id 			serial,
    name 		varchar(255) 	unique,
    tier 		integer			not null,
    islinear 	boolean			not null,
    stages 		integer,
    created		date			not null
);