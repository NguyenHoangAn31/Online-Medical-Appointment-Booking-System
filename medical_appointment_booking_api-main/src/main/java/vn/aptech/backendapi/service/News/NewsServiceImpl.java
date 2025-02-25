package vn.aptech.backendapi.service.News;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aptech.backendapi.dto.News.NewsCreateDto;
import vn.aptech.backendapi.dto.News.NewsDto;
import vn.aptech.backendapi.entities.News;
import vn.aptech.backendapi.entities.User;
import vn.aptech.backendapi.repository.NewsRepository;
import vn.aptech.backendapi.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserRepository userRepository;

    private NewsCreateDto toCreateDto(News n) {
        NewsCreateDto newsCreateDto = mapper.map(n, NewsCreateDto.class);
        newsCreateDto.setUser_id(n.getUser().getId());
        return newsCreateDto;
    }

    private NewsDto toDto(News n) {
        NewsDto newsDto = mapper.map(n, NewsDto.class);
        newsDto.setCreator_email(n.getUser().getEmail());
        newsDto.setCreator_id(n.getUser().getId());
        return newsDto;
    }

    @Override
    public List<NewsDto> findAll() {
        return newsRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<NewsDto> findById(int id) {
        return newsRepository.findById(id).map(this::toDto);
    }

    @Override
    public Optional<NewsCreateDto> findByIdForUpdate(int id) {
        return newsRepository.findById(id).map(this::toCreateDto);
    }

    @Override
    public NewsCreateDto save(NewsCreateDto dto) {
        News news = mapper.map(dto, News.class);

        userRepository.findById(dto.getUser_id()).ifPresent(news::setUser);

        News result = newsRepository.save(news);
        return toCreateDto(result);
    }

    @Override
    public boolean deleteById(int id) {
        if (newsRepository.existsById(id)) {
            newsRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean changeStatus(int id, int status) {
        return newsRepository.findById(id).map(news -> {
            news.setStatus(status == 1);
            newsRepository.save(news);
            return true;
        }).orElse(false);
    }

    @Override
    public Optional<NewsCreateDto> update(int id, NewsCreateDto dto) {
        return newsRepository.findById(id).map(news -> {
            news.setTitle(dto.getTitle());
            news.setContent(dto.getContent());
            news.setStatus(dto.getStatus());

            userRepository.findById(dto.getUser_id()).ifPresent(news::setUser);

            News updatedNews = newsRepository.save(news);
            return toCreateDto(updatedNews);
        });
    }

    @Override
    public List<NewsDto> findByCreatorId(int userId) {
        return newsRepository.findByUserId(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
