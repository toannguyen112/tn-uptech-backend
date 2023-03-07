import { Table, Model, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "contacts",
  timestamps: true,
})
export default class Contact extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  data: string;

  @Column
  type: string;

  @Column
  user_agent: string;

  @Column
  ip_address: string;

  @Column
  request_url: string;

  @Column
  status: number;

}
