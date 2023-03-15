import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";
import Helper from "../utils/Helper";

@Table({
  tableName: "projects",
  timestamps: true,
})
export default class Project extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  status: string;

  @Column
  description: string;

  @Column
  isFeatured: boolean;

  @Column
  content: string;

  public transform(item: any) {
    return {
      "id": item.id,
      "name": item.name,
      "thumbnail": "https://picsum.photos/200/300",
      "status": item.status,
      "description": item.description,
      "isFeatured": item.isFeatured,
      "content": Helper.transformRichText(item.content),
      "createdAt": Helper.formatDayJs(item.createdAt),
      "updatedAt": Helper.formatDayJs(item.updatedAt),
    }
  }
}
