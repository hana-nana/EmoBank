package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserIdAndIsDelete(String id, int isDelete);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update User set userId = :userId, password = :password, nickname = :nickname, gender = :gender " +
            "where userPk = :userPk", nativeQuery = true)
    int updateUserInfo(String userId, String password, String nickname, String gender, int userPk);

    Long countByUserIdAndIsDelete(String userId, int isDelete);

    @Query(value = "select userKey from User where userPk = :userPk", nativeQuery = true)
    String findUserKey(int userPk);
}