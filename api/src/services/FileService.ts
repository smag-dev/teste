/* serviço que permite gravar ficheiro no no projeto */
/*libraria para trabalhar caminhos*/
import path from "path";
/*libraria para gerar codigo aleatorio identificador*/
import { v4 as uuidv4 } from "uuid";

class FileService {
  /* função que vai gravar fcheiro na bd */
  save(file: any) {
    /* extensao do ficheiro, vai buscar o mimetype e retorna a extensão que está na posição 1 */
    const fileExtension = file.mimetype.split("/")[1];
    /* gera um nome com o uuid e aplica-lhe e extensão */
    const fileName = uuidv4() + "." + fileExtension;
    /* constroi o caminho do ficheiro */
    const filePath = path.resolve("static", fileName);
    /* copia o ficheiro para o caminho dado */
    file.mv(filePath);
    return fileName;
  }
}

export default FileService;
