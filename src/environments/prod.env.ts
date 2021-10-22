import { Environment } from './env'

export const ProdEnvironment: Environment = {
    db_url:"mongodb+srv://scripbox:scripbox@cluster0.x2aa4.mongodb.net/scripboxDatabase?retryWrites=true&w=majority",
    jwt_secret: "devSecret"
}