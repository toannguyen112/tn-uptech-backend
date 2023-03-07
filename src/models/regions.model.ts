import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table({
  tableName: "regions",
  timestamps: true,
})
export default class Region extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  country_id: number;

  @Column
  level: string;

  @Column
  code: string;

  @Column
  parent_code: string;

  @Column
  type: number;

  @Column
  name_with_type: string;

  @Column
  path: number;


  @Column
  path_with_type: string;

  @Column
  sort: number;

  public transform(item) {
    return {
      ...item
    }
  }

  public transformDetails(item) {
    return {
      ...item
    }
  }
}
