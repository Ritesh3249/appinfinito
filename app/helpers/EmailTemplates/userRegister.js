function userRegister  () {
     
    return  `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create password</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <style>
        /* *{
            padding: 0;
            margin: 0;
        } */
        .main-temp{
            border: 1px solid black;
            border-radius: 10px;
            width: 50%;
            padding: 2rem;
            font-family: 'Roboto', sans-serif;
        }
        .main-temp a{
            /* border: 1px solid black; */
            border-radius: 5px;
            padding: 1rem;
            /* margin: 3rem 0 !important; */
            text-decoration: none   ;
            color: white;
            background-color: grey;
        }
        .main-temp a:hover{
            transition: 1s ease;
            background-color: none;
            border: 1px solid black;
            color: grey;


        }
        .main-temp hr{
            margin-top: 2rem;
        }
        .content{
            margin-bottom: 2rem;
        }
    </style>
</head>
<body>
    <div class="main-temp">
        <div class="fist-temp">
            <h2>Welcome to appinfinito</h2>
            <div class="content">
                <p>You're receiving this message becauses you recently signed up for appinfinito account.</p>
                <p>You are registered successfully</p>
            </div>
            <hr>
            
        </div>
    </div>
    
</body>
</html>
    `
};


module.exports = userRegister;