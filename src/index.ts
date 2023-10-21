
import express, { Request, Response , Application } from 'express';

const PORT = 3000

const app: Application = express();
app.use(express.json())

export class ShoppingList{
    items: ShoppingItem[]

    constructor(items: ShoppingItem[]){
        this.items = items
    }

    push(item:ShoppingItem):void {
        this.items.push(item)
    }

    find (name:string):ShoppingItem | null{
      return this.items.find((item) => item.name === name) ?? null // vrati sa null len vtedy ak lava strana vrati undefined LEN VTEDY
        
    }
}

export class ShoppingItem{
    name: string
    constructor (name: string){
        this.name = name
    }
}

const milk = new ShoppingItem('Mlieko')
const juice = new ShoppingItem('Dzusik')
const database:ShoppingList = new ShoppingList([milk, juice]);

app.get('/', (req: Request, res: Response) => {
      res.status(200).json(database.items)
});

app.get('/:itemName', (req: Request, res: Response) => {
  res.status(200).json(database.find(req.params.itemName))
});

app.post('/', (req: Request, res: Response) => {
    const{body:pes} = req
    const newItem = new ShoppingItem(pes.name)
   
    database.push(newItem)
    res.status(201).json(newItem)
});

app.listen(PORT, () => {
});

export default app