package vn.aptech.backendapi.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<?> findById(@PathVariable("id") int id) {
        Optional<NewsDto> result = newsService.findById(id);
        return result.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found"));
    }

    @GetMapping(value = "/find_for_update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findByIdForUpdate(@PathVariable("id") int id) {
        Optional<NewsCreateDto> result = newsService.findByIdForUpdate(id);
        return result.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found for update"));
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) throws IOException {
        Optional<NewsDto> result = newsService.findById(id);
        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found");
        }
        if (result.get().getStatus() == 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot delete active news");
        }
        
        String pathImage = result.get().getImage();
        boolean deleted = newsService.deleteById(id);
        if (deleted && pathImage != null) {
            fileService.deleteFile("News", pathImage);
        }
        return ResponseEntity.ok("News deleted successfully");
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestParam("image") MultipartFile photo,
                                     @RequestParam("news") String news) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        NewsCreateDto newsCreateDto = objectMapper.readValue(news, NewsCreateDto.class);
        
        if (photo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image is required");
        }
        
        newsCreateDto.setImage(fileService.uploadFile("news", photo));
        NewsCreateDto result = newsService.save(newsCreateDto);
        return ResponseEntity.ok(result);
    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(@PathVariable("id") int id,
                                    @RequestParam(name = "image", required = false) MultipartFile photo,
                                    @RequestParam("news") String news) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        NewsCreateDto newsCreateDto = objectMapper.readValue(news, NewsCreateDto.class);
        
        if (photo != null) {
            if (newsCreateDto.getImage() != null) {
                fileService.deleteFile("news", newsCreateDto.getImage());
            }
            newsCreateDto.setImage(fileService.uploadFile("news", photo));
        }
        
        newsCreateDto.setId(id);
        NewsCreateDto updatedNews = newsService.save(newsCreateDto);
        return updatedNews != null ? ResponseEntity.ok(updatedNews) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("News update failed");
    }

    @PutMapping(value = "/changestatus/{id}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeStatus(@PathVariable("id") int id, @PathVariable("status") int status) {
        boolean changed = newsService.changeStatus(id, status);
        return changed ? ResponseEntity.ok("Status changed successfully") : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to change status");
    }
    
    @GetMapping(value = "/status/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NewsDto>> findByStatus(@PathVariable("status") int status) {
        List<NewsDto> result = newsService.findByStatus(status);
        return ResponseEntity.ok(result);
    }
}
