package vn.aptech.backendapi.service.File;

import java.nio.file.Paths;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.DirectoryStream;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    private final String UPLOAD_DIR = Paths.get("src/main/resources/static/images/").toString();

    public String uploadFile(String folderName, MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR).resolve(folderName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        String uuidFileName = UUID.randomUUID().toString() + "." + fileExtension;
        Path path = uploadPath.resolve(uuidFileName);

        try (OutputStream os = Files.newOutputStream(path)) {
            os.write(file.getBytes());
        }
        return uuidFileName;
    }

    public boolean deleteFile(String folderName, String fileName) {
        Path deletePath = Paths.get(UPLOAD_DIR).resolve(folderName).resolve(fileName);

        if (!Files.exists(deletePath)) {
            System.err.println("Tệp không tồn tại: " + deletePath);
            return false;
        }

        try {
            Files.delete(deletePath);
            return true;
        } catch (IOException e) {
            System.err.println("Lỗi khi xóa tệp: " + e.getMessage());
            return false;
        }
    }

    public String getFileUrl(String folderName, String fileName) {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(folderName).resolve(fileName);
        if (Files.exists(filePath)) {
            return "/static/images/" + folderName + "/" + fileName;
        }
        return null;
    }

    public List<String> listFiles(String folderName) {
        List<String> fileNames = new ArrayList<>();
        Path folderPath = Paths.get(UPLOAD_DIR).resolve(folderName);

        if (Files.exists(folderPath) && Files.isDirectory(folderPath)) {
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath)) {
                for (Path file : stream) {
                    fileNames.add(file.getFileName().toString());
                }
            } catch (IOException e) {
                System.err.println("Lỗi khi liệt kê tệp: " + e.getMessage());
            }
        }
        return fileNames;
    }
}
