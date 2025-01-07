package vn.aptech.backendapi.dto.News;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class NewsCreateDto {
    private int id;
    private String title;
    private String content;
    private String image;
    private String url;
    private int status;
    private int user_id;
    private String dayCreate;
}
