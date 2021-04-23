import { getCustomRepository, Repository } from "typeorm";
import {Connection} from "../entities/Connection";
import { Connectionsrepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate{
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsrepository: Repository<Connection>
  constructor(){
    this.connectionsrepository = getCustomRepository(Connectionsrepository);
  }

  async create({ socket_id, user_id,admin_id, id}: IConnectionCreate){
    const connection = this.connectionsrepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });
    await this.connectionsrepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string){
    const connection = await this.connectionsrepository.findOne({
      user_id,
    });
    return connection;
  }
}

export {ConnectionsService}