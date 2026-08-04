const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    const { method, url } = req;

    console.log({ method, url });


    if (url == "/user" && method == "GET") {

        const users = fs.readFileSync("users.json", "utf8");

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(users);
    }


    else if (url == "/user" && method == "POST") {

        let body = "";

        req.on("data", (chunk) => {

            console.log(chunk);

            body += chunk;

            console.log({ body });

        });

        req.on("end", () => {

            const { name, age, email } = JSON.parse(body);

            console.log({ name, age, email });

            const users = JSON.parse(
                fs.readFileSync("users.json", "utf8")
            );

            const exist = users.find(user => user.email == email);

            if (exist) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                return res.end(JSON.stringify({
                    message: "Email already exists."
                }));

            }

            const newUser = {
                id: users.length + 1,
                name,
                age,
                email
            };

            users.push(newUser);

            fs.writeFileSync(
                "users.json",
                JSON.stringify(users, null, 2)
            );

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "User added successfully."
            }));

        });


    }





    else if (url.startsWith("/user/") && method == "PATCH") {

        const id = Number(url.split("/")[2]);

        let body = "";

        req.on("data", (chunk) => {

            console.log(chunk);

            body += chunk;

            console.log({ body });

        });

        req.on("end", () => {

            const { name, age, email } = JSON.parse(body);

            console.log({ name, age, email });

            const users = JSON.parse(
                fs.readFileSync("users.json", "utf8")
            );

            const userIndex = users.findIndex(user => user.id == id);

            if (userIndex == -1) {

                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                return res.end(JSON.stringify({
                    message: "User ID not found."
                }));

            }

            if (name) users[userIndex].name = name;
            if (age) users[userIndex].age = age;
            if (email) users[userIndex].email = email;

            fs.writeFileSync(
                "users.json",
                JSON.stringify(users, null, 2)
            );

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "User updated successfully."
            }));

        });

    }






    else if (url.startsWith("/user/") && method == "DELETE") {

        const id = Number(url.split("/")[2]);

        const users = JSON.parse(
            fs.readFileSync("users.json", "utf8")
        );

        const userIndex = users.findIndex(user => user.id == id);

        if (userIndex == -1) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "User ID not found."
            }));

        }

        users.splice(userIndex, 1);

        fs.writeFileSync(
            "users.json",
            JSON.stringify(users, null, 2)
        );

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "User deleted successfully."
        }));

    }





    else if (url.startsWith("/user/") && method == "GET") {

        const id = Number(url.split("/")[2]);

        const users = JSON.parse(
            fs.readFileSync("users.json", "utf8")
        );

        const user = users.find(user => user.id == id);

        if (!user) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "User not found."
            }));

        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(user));

    }


    else {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Route not found."
        }));

    }

});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});