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
        NewsCreateDto NewsCreateDto = mapper.map(n, NewsCreateDto.class);
        NewsCreateDto.setUser_id(n.getUser().getId());
        return NewsCreateDto;
    }

    private NewsDto toDto(News n) {
        NewsDto NewsDto = mapper.map(n, NewsDto.class);
        NewsDto.setCreator_email(n.getUser().getEmail());
        NewsDto.setCreator_id(n.getUser().getId());
        return NewsDto;
    }

    @Override
    public List<NewsDto> findAll() {
        List<News> news = newsRepository.findAll();
        return news.stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<NewsDto> findById(int id) {
        Optional<News> result = newsRepository.findById(id);
        return result.map(this::toDto);
    }
    @Override
    public Optional<NewsCreateDto> findByIdForUpdate(int id) {
        Optional<News> result = newsRepository.findById(id);
        return result.map(this::toCreateDto);
    }

    @Override
    public NewsCreateDto save(NewsCreateDto dto) {
        News n = mapper.map(dto, News.class);

        if (dto.getUser_id() > 0) {
            Optional<User> u = userRepository.findById(dto.getUser_id());
            u.ifPresent(doctor -> n.setUser(mapper.map(u, User.class)));
        }
        News result = newsRepository.save(n);
        return toCreateDto(result);
    }

    @Override
    public boolean deleteById(int id) {
        try {
            newsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean changeStatus(int id,int status){
        News f = newsRepository.findById(id).get();
        boolean newStatus = (status == 1) ? false : true; 
        f.setStatus(newStatus);
        try {
            newsRepository.save(f);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
