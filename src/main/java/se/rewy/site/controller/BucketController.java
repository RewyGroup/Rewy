package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.rewy.site.aws.BucketService;

import java.io.IOException;


@RestController
@RequestMapping("/upload")
public class BucketController {

    private BucketService bucketService;


    @Autowired
    public BucketController(BucketService bucketService){
        this.bucketService = bucketService;
    }

    @PostMapping()

    public ResponseEntity<String> uploadFile(@RequestPart MultipartFile multipartFile) throws IOException {
         String fileUrl = this.bucketService.uploadFile(multipartFile);
        return ResponseEntity.ok(fileUrl);
    }
}
