package se.rewy.site.aws;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

/**
 * Created by mattua on 06/06/2016.
 */
@Service
public class BucketService {

    private final String bucketName = "rewy";
    @Value("${access_key_id}")
    private String access_key_id;
    @Value("${secret_access_key}")
    private String secret_access_key;

    private File convertMultiPartToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return file;
    }

    public String uploadFile(MultipartFile multipartFile) throws IOException {

        BasicAWSCredentials creds = new BasicAWSCredentials(access_key_id, secret_access_key);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(creds))
                .withRegion(Regions.EU_WEST_1).build();

            File file = convertMultiPartToFile(multipartFile);

            String fileName = multipartFile.getOriginalFilename() + System.currentTimeMillis();

            PutObjectRequest putRequest = new PutObjectRequest(bucketName, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead);
            s3Client.putObject(putRequest);
            file.delete();

            String objectUrl = s3Client.getUrl(bucketName,fileName).toExternalForm();
            return objectUrl;
    }

}