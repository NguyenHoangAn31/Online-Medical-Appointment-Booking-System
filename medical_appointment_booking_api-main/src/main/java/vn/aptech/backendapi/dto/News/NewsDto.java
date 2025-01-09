package vn.aptech.backendapi.dto.News;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class NewsDto {
    private int id;
    private String title;
    private String content;
    private String image;
    private String url;
    private int status;
    private int creator_id;
    private String creator_email;
    private String dayCreate;
}