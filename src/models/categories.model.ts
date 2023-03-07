import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import File from "./file.model";

@Table({
  tableName: "categories",
  timestamps: true,
})
export default class Category extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  slug: string;

  @ForeignKey(() => File)
  @Column
  file_id: number;

  @Column
  link: string;

  @Column
  image: string;

  @BelongsTo(() => File)

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
