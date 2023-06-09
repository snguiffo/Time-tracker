import { DataSource, Repository } from "typeorm"
import * as yaml from 'js-yaml'
import * as fs from 'fs'


export async function loadFixtures(name: string, dbConnection: DataSource): Promise<any> {

    let items: any[] = []
    try {
        const file: any = yaml.load(fs.readFileSync(`src/demo/testdata/${name}.yml`, 'utf8'));
        console.log(file)
        items = file["fixtures"]
    } catch (e) {
        console.log("fixtures error", e);
    }

    if(!items) {
        return
    }

    items.forEach(async (item: any) => {
        const entityName = Object.keys(item)[0]
        const data = item[entityName]
        await dbConnection.createQueryBuilder().insert().into(entityName).values(data).execute()
    })
}