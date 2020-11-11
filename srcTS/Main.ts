import {ProjectManager} from './ProjectManager'
import { BasicFactory } from './BasicFactory';

const main = async()=>{
    const projectManager = new ProjectManager(new BasicFactory());
    await projectManager.run();

}

main().catch(x=>console.log(`Error: ${x}`));