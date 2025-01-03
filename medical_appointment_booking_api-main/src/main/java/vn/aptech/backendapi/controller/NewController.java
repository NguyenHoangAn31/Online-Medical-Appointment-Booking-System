package vn.aptech.backendapi.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.aptech.backendapi.dto.News.NewsCreateDto;
import vn.aptech.backendapi.dto.News.NewsDto;
import vn.aptech.backendapi.service.File.FileService;
import vn.aptech.backendapi.service.News.NewsService;

@RestController
@RequestMapping(value = "/api/news")
public class NewController {
    @Autowired
    private FileService fileService;

    @Autowired
    private NewsService newsService;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NewsDto>> findAll() {
        List<NewsDto> result = newsService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsDto> findById(@PathVariable("id") int id) {
        Optional<NewsDto> result = newsService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/find_for_update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsCreateDto> findByIdForUpdate(@PathVariable("id") int id) {
        Optional<NewsCreateDto> result = newsService.findByIdForUpdate(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) throws IOException {
        Optional<NewsDto> result = newsService.findById(id);
        int status = result.get().getStatus();
        if (status == 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("News is Active");
        }
        String pathImage = result.get().getImage();
        boolean deleted = newsService.deleteById(id);
        if (deleted) {
            if (pathImage != null) {
                fileService.deleteFile("News", pathImage);
            }
        }
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsCreateDto> Create(@RequestParam("image") MultipartFile photo,
            @RequestParam("news") String news) throws IOException {

        // xử lý NewsCreateDto
        ObjectMapper objectMapper = new ObjectMapper();
        NewsCreateDto NewsCreateDto = objectMapper.readValue(news, NewsCreateDto.class);
        // xử lý hình ảnh
        System.out.println(NewsCreateDto.getDayCreate());
        NewsCreateDto.setImage(fileService.uploadFile("news", photo));
        NewsCreateDto result = newsService.save(NewsCreateDto);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsCreateDto> updateTutorial(@PathVariable("id") int id,
            @RequestParam(name = "image", required = false) MultipartFile photo,
            @RequestParam("news") String news) throws IOException {
        System.out.println(news);

        // xử lý NewsCreateDto
        ObjectMapper objectMapper = new ObjectMapper();
        NewsCreateDto NewsCreateDto = objectMapper.readValue(news,
                NewsCreateDto.class);
        // xử lý hình ảnh
        if (photo != null) {
            // nếu ảnh tồn tại thì xóa
            if (NewsCreateDto.getImage() != null) {
                fileService.deleteFile("news", NewsCreateDto.getImage());
            }
            NewsCreateDto.setImage(fileService.uploadFile("news", photo));

        }
        NewsCreateDto.setId(id);
        NewsCreateDto updatedNews = newsService.save(NewsCreateDto);
        if (updatedNews != null) {

            return ResponseEntity.ok(updatedNews);
        }
        return ResponseEntity.notFound().build();

    }

    @PutMapping(value = "/changestatus/{id}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeStatusNews(@PathVariable("id") int id,@PathVariable("status") int status) {
        boolean changed = newsService.changeStatus(id,status);
        if (changed) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
