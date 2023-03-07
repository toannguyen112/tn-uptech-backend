import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";

@Table({
  tableName: "skills",
  timestamps: true,
})
export default class Banner extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  status: string;

  /**
   * transform
   */
  public transform(item: any) {
    return {
      ...item
    }
  }

}
