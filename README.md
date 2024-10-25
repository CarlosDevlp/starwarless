<h1>#StarWarLess - GUIA DE USO</h1>

<h2>Tecnologias usadas</h2>
<ul>
    <li>FRAMEWORK:  Serverless Framework 3.38.0</li>
    <li>LENGUAJE: Javscript/Typescript</li>
    <li>CLOUD: AWS Api Gateway/ AWS Lambda</li>
    <li>BASE DE DATOS: AWS DynamoDB</li>
    <li>DOCUMENTATION: Swagger</li>
    <li>TESTING: Jest</li>
    <li>OTRAS HERRAMIENTAS: Postman</li>
</ul>


<h2>Guia de uso:</h2>

## Instalación

-Instale todos los paquetes y además, instale exactamente la versión 3.38.0 de serverless por temas de compatibilidad con algunos plugins y el uso del template aws/typescript.

```bash
$ npm install
$ npm i -g serverless@3.38.0
```

-Descargue DynamoDB Local desde la página oficial de AWS [click aquí](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) y ubique su contenido en la carpeta <b>/dynamodb_local</b>

-Por último, agregue las tablas al dynamodb local

```bash
$ aws dynamodb create-table \
  --table-name starwarless-films \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000 \
  --region us-east-1
```

```bash
$ aws dynamodb create-table \
  --table-name starwarless-people \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000 \
  --region us-east-1
```

### Ejecutarlo localmente

Si ha configurado su cuenta de AWS en la linea de comandos correctamente y ha hecho la instalación recomendada de los pasos anteriores, luego solo debe hacer lo siguiente:

-Ejecutar la base de datos local
```
$ npm run start:dybamodb
```
-Correr localmente el servidor
```
$ npm run start
```

ó

```
$ sls offline start --stage local
```

### Ver la documentación en Swagger
Para poder ver la documentación en Swagger, solo basta con correr el siguiente comando: 

```
$ npm run start:documentation
```

Finalmente, acceda al link que se le provee como resultado, ejemplo: http://localhost:3500/api-docs


### Correr las pruebas unitarias
Con el siguiente comando puede correr las pruebas unitarias alojadas en la carpeta /test. Estas prueban que los handlers de las funciones cumplan su propósito correctamente.

```
$ npm run test
```

### Subir los cambios a AWS

Para subir los cambios, solo debe correr el siguiente comando:

```
$ sls deploy
```

ó

```
$ npm run deploy
```

-NOTA: en el archivo starwars-films.service.ts, uncomment la linea de código (como se muestra abajo) de ser 
necesario.

```
//return this.parseFilms(data?.Items || []); TODO: uncomment if its not working
```