package vn.aptech.backendapi.service.News;

import java.util.List;
import java.util.Optional;

import vn.aptech.backendapi.dto.News.NewsCreateDto;
import vn.aptech.backendapi.dto.News.NewsDto;

public interface NewsService {
    List<NewsDto> findAll();
    Optional<NewsDto> findById(int id);
    Optional<NewsCreateDto> findByIdForUpdate(int id);
    NewsCreateDto save(NewsCreateDto dto);
    boolean deleteById(int id);
    boolean changeStatus(int id,int status);
}
