# GrapeJelly

I was jelly of ruby-grape's grape-entity gem so here we have a JavaScript
serializer framework inspired by grape-entity. It is not intended to be a
complete implementation of grape-entity.

## Usage

Define entities by extending the `Entity` class.
You must implement a `define` method that defines the entity using
`Entity.prototype.expose`.

```js
class UserEntity extends Entity {
  define() {
    this.expose('username', { as: 'not_username' });
    this.expose('password', user => user.notPassword);
  }
}
```

You can use `Entity.prototype.represent` to serialize your object.

```js
const data = {
    username: 'foo',
    password: 'bar',
    notPassword: 'raboof',
    otherValue: 'not included',
};

const entity = new UserEntity();
const serializedData = entity.represent(data);

console.log(serializedData);

// { not_username: 'foo', password: 'raboof' }
```