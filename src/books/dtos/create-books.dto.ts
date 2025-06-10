import{IsNotEmpty,IsString} from 'class-validator'
export class CreateBooksDto {

    @IsNotEmpty()
    @IsString({message:"error title is a string"})
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    publication_year: number;

    @IsNotEmpty()
    @IsString()
    isbn: string;
}