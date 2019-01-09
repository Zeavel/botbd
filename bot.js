const Discord = require('discord.js');
const client = new Discord.Client();
const CC = require('./command_create.js');
const Command = CC.Command;




var Commandss = new CC.Commands();
var fs = require("fs");

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("-" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role)
{
    if (pluck(mem.roles).includes(role))
    {
        return true;
    }
    else
    {
        return false;
    }
}

client.on("message", message =>
{
  
if(commandIs("link", message))
{
    var code = message.content.substring(6)
    console.log(code)
    var mysql      = require('mysql');
  var connection = mysql.createConnection({
 
   
      host: process.env.HOST,
      database: "frogsboot",
      password: process.env.PASS, 
      user: process.env.USER
  //    database    : 'frogsboot'

    });
      var connection2 = mysql.createConnection({
 
   
      host: process.env.HOST,
      database: "frogsboot",
      password: process.env.PASS, 
      user: process.env.USER
  //    database    : 'frogsboot'

    });
     
    connection.connect();

   
      connection.query(`SELECT * FROM users WHERE discordCode='${code}';`, function (error2, results2, fields2) {
        if (error2) message.channel.send("Неправильно введен код")
        if(code == "") message.channel.send("Введите код")
else
{
    if(results2[0].discordStatus == "2")
    {
        message.channel.send("Нельзя этот код больше использовать")

    }
    else
    {
        connection2.connect();
        connection2.query(`UPDATE users SET discordStatus = '2' WHERE discordCode='${code}';`, function (error, results, fields) {
       
            
        console.log('The solution is: ', results);
            client.guilds.get("514908242292244532").channels.get("514908242716131348").send("<@"+message.author.id+"> got Verified :white_check_mark:")
            var role = client.guilds.get("514908242292244532").roles.find('name', "USER")
            console.log(role)
            client.guilds.get("514908242292244532").members.get(message.author.id).addRole(role)
  
        
          })
          connection2.end();
    }
  
}
    
      });
 

  
     
    connection.end();
}
})


client.login(process.env.BOT); //вход для бота


