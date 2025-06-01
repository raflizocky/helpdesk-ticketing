## Installation

1. Create the database (ex: `helpdesk_db`)

2. Terminal

    ```shell
    git clone -b helpdesk-be https://github.com/raflizocky/helpdesk-ticketing.git
    ```

3. `.env`

    ```shell
    PORT=5000
    DB_USER=your_postgres_username
    DB_HOST=localhost
    DB_NAME=helpdesk_db
    DB_PASSWORD=your_postgres_password
    DB_PORT=5432
    JWT_SECRET=your_jwt_key
    DATABASE_URL=postgres://your_postgres_username:your_postgres_password@localhost:5432/helpdesk_db
    ```

## Contributing

If you encounter any issues or would like to contribute to the project, feel free to:

-   Report any [issues](https://github.com/raflizocky/helpdesk-ticketing/issues)
-   Submit a [pull request](https://github.com/raflizocky/helpdesk-ticketing/pulls)
-   Participate in [discussions](https://github.com/raflizocky/helpdesk-ticketing/discussions) for any questions, feedback, or suggestions


## License

Code released under the [MIT License](https://github.com/raflizocky/helpdesk-ticketing/blob/main/LICENSE).