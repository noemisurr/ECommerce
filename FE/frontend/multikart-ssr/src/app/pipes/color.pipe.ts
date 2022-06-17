import { Pipe, PipeTransform } from "@angular/core";
import { ColorService } from "../pages/account/services/color.service";
import { IColor } from "../shop/interfaces/interface";

@Pipe({
  name: "color",
})
export class ColorPipe implements PipeTransform {
  colors: IColor[];

  constructor(private colorService: ColorService) {
    this.colors = this.colorService.colors;
  }

  transform(idColor: any, ...args: unknown[]): unknown {
    idColor = parseInt(idColor);
    const result = this.colors.find((color) => color.id === idColor);
    return result ? result.hex : "#FFFFFF";
  }
}
