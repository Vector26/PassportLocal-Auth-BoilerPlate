# PassportLocal Auth BoilerPlate

This is a boilerplate code for implementing Passport-Local Strategy using PassportJS

The user model is : 
```json
user={
  username:string,
  hash:string,
  salt:string
  }
```
It is easy to change various defaults such as customFields Object
```json
{
  usernameField:....,
  passwordField:....
}
```
The main logic is verifyCallback() function, which checks as per your model requirement and is used as a view in POST /login route.
