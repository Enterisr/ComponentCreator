Small templating engine that will generate React components

Run it with

    create-react-component --name <Component>

Or simply

    crc --name <Component>

You can modify the type of component it generates by setting the `componentCreator_template` env var (or the local .env file)
Or by providing `--template` arg in the CLI

Currently the only two types supported are

- JS_SASS
- TS_StyledComponents
