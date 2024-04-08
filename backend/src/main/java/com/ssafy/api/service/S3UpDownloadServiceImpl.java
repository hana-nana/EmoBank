package com.ssafy.api.service;


import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import com.google.j2objc.annotations.ObjectiveCName;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;


@Service("S3UpDownloadService")
public class S3UpDownloadServiceImpl implements S3UpDownloadService{

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.credentials.access-key}")
    private String key;

    @Value("${cloud.aws.cloudfront.url}")
    private String cloudfrontUrl;

    @Override
    public String saveImage(@RequestParam MultipartFile multipartFile,String fileName,int userPk) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());


        try {
            amazonS3Client.putObject(bucket, "Emobank/accountImg/"+userPk+"/"+fileName, multipartFile.getInputStream(), metadata);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cloudfrontUrl+"/Emobank/accountImg/"+userPk+"/"+fileName;
    }

    public Map<String, Object> getFile(String s3FileName) throws IOException{
        Map<String, Object> map = new HashMap<>();
        String extension = s3FileName.substring(s3FileName.lastIndexOf(".") + 1);

        S3Object o = amazonS3Client.getObject(new GetObjectRequest(bucket, s3FileName));
        S3ObjectInputStream objectInputStream = o.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        String fileName = URLEncoder.encode(s3FileName, "UTF-8").replaceAll("\\+", "%20");
        HttpHeaders httpHeaders = new HttpHeaders();
        if(extension.equals("JPG") || extension.equals("JPEG") || extension.equals("PNG") || extension.equals("GIF"))
            httpHeaders.setContentType(MediaType.IMAGE_PNG);
        else
            httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDispositionFormData("attachment", fileName);

        map.put("bytes",bytes);
        map.put("headers",httpHeaders);
        return map;

    }
}
