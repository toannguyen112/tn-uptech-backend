
import { Table, PrimaryKey, Column, Model } from "sequelize-typescript";

@Table({
  tableName: "roles",
  timestamps: true,
})
class Role extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  role_name: number;

  @Column
  role_description: string;

}

export default Role;
