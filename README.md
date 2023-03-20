# prueba-6
Registro Nacional de Mascotas.

Aplicación web que permite el registro de mascotas almacenando el nombre de la mascota y RUN de su dueño.
Los registros ingresados son almacenados en archivos JSON, los cuales fueron estructurados siguiendo un modelo de dos archivos, un archivo que almacena el RUN de los usuarios junto con Id y otro que almacena los nombres de las mascotas asociados a un idUsuario que funciona como llave foránea para asociar ambos archivos.

Servidor web: 
    Servidor implementado con el paquete Express de Node.js.
    El servidor web permite realizar 6 solicitudes HTTP a la base de datos:
        - Listar todas las mascotas con el RUN de su correspondiente dueño.
        - Consultar el RUN del dueño de una mascota ingresando el nombre.
        - Consultar todas las mascotas registradas a nombre de un dueño ingresando el RUN.
        - Agregar un nuevo registro ingresando el RUN del dueño y el nombre de la mascota.
        - Borrar una mascota de la base de datos ingresando su nombre y el RUN del dueño (se solicita el RUN previendo que los nombres de 
        las mascotas se puedan repetir).
        - Borrar todas las mascotas asociadas a un RUN.
    * Ninguna de las consultas para borrar registros eliminan un RUN ya registrado. Las solicitudes fueron escritas de manera que permitan primero comprobar si el RUN ya existe en la base para evitar usuarios duplicados.
    * Todas las solicitudes están escritas siguiendo la estructura try catch para el manejo de errores.

Front end:
    Plataforma web escrita con HTML, JavaScript y Bootstrap. 
        - Despliega 6 botones, cada uno de estos asociado a una de las solicitudes HTTP anteriormente descritas. 
        - Se utilizó Axios como Cliente HTTP para realizar las solicitudes al servidor.
        - Todas las solicitudes que requieren ingreso de parámetros de consulta y envío de datos tienen programas para la validación de los datos con el fin de evitar registros fuera de formato y consultas de datos inexistentes.
    

