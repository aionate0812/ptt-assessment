CREATE TABLE users(userid SERIAL PRIMARY KEY,
                                         username text NOT NULL UNIQUE,
                                                                email text NOT NULL,
                                                                           token text NOT NULL);


CREATE TABLE portfolio(portfolioid SERIAL PRIMARY KEY,
                                                  userid SERIAL REFERENCES users(userid),
                                                                           balance double precision NOT NULL DEFAULT 5000);


CREATE TABLE orders(orderid SERIAL PRIMARY KEY,
                                           portfolioid SERIAL REFERENCES portfolio(portfolioid),
                                                                         ticker text NOT NULL,
                                                                                     amount integer NOT NULL,
                                                                                                    price numeric NOT NULL);