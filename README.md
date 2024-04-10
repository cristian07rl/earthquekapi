# README
Prueba tecnica realizada usando en ruby on rails como backend y reach como frontend
todo el frond esta en /client

Ruby version: 7.1

# Configuracion

### crea un archivo .env en la raiz

* DB_USERNAME="*"
* DB_PASSWORD="*"

### Crear un archivo .env para el cliente
* VITE_urlapi = "http://localhost:3000/api/features/"

### Ejecutar *bundle* para instalar los paquetes necesarios
```ruby
bundle
```
### Crear la database
En este proyecto se usa postgres como base de datos. para crearla use los comandos *rails db:create* *rails db:migrate*
```ruby
rails db:create
rails db:migrate
```
### Llenar la database
Para llenar la base de datos ejecuta el comando *rails db:seed* con la informacion de los ultimos 30 dias
```ruby
rails db:seed
```
### Actualizar la database
siempre se puede ejecutar la task data:update para obtener la informacion de los ultimos 7 dias 
```ruby
rails data:update
```
# iniciar la aplicaion

* ejecuta el comando *rails s* para iniciar el servidor
```ruby
  rails s
```
* en la carpeta /client ejecutar npm run dev para iniciar el cliente
```nodejs
  npm run dev
```
