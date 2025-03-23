-- 用户表，存储文章分类用户信息
CREATE TABLE blog_users (
    -- 用户 ID，自增主键
                            user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一标识，自增',
    -- 用户名，唯一且不能为空
                            username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户登录使用的名称，必须唯一',
    -- 用户密码，经过加密存储
                            password VARCHAR(255) NOT NULL COMMENT '用户登录密码，加密存储',
    -- 用户邮箱，唯一且不能为空
                            email VARCHAR(100) NOT NULL UNIQUE COMMENT '用户的邮箱地址，用于找回密码等操作，必须唯一',
    -- 用户头像链接
                            avatar VARCHAR(255) COMMENT '用户的头像图片链接',
    -- 用户注册时间，默认当前时间
                            register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '用户注册的时间，默认值为注册时的时间'
) COMMENT = '文章分类用户信息表';

-- 文章表，存储博客文章的详细信息
CREATE TABLE blog_articles (
    -- 文章 ID，自增主键
                               article_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '文章的唯一标识，自增',
    -- 文章作者的用户 ID
                               author_id INT NOT NULL COMMENT '文章作者的用户 ID，关联 blog_users 表',
    -- 文章标题，不能为空
                               title VARCHAR(100) NOT NULL COMMENT '文章的标题',
    -- 文章内容，以文本形式存储
                               content TEXT NOT NULL COMMENT '文章的具体内容',
    -- 文章创建时间，默认当前时间
                               create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '文章创建的时间，默认值为创建时的时间',
    -- 文章更新时间，每次更新时自动更新
                               update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '文章最后更新的时间，每次更新文章时自动更新',
    -- 文章所属分类
                               category VARCHAR(50) COMMENT '文章所属的分类',
    -- 文章标签，多个标签用逗号分隔
                               tags VARCHAR(255) COMMENT '文章的标签，多个标签用逗号分隔',
    -- 文章浏览量，默认值为 0
                               views INT DEFAULT 0 COMMENT '文章的浏览次数，初始值为 0',
    -- 文章点赞数，默认值为 0
                               likes INT DEFAULT 0 COMMENT '文章的点赞数量，初始值为 0',
    -- 外键约束，关联文章作者的用户 ID
                               FOREIGN KEY (author_id) REFERENCES blog_users(user_id)
) COMMENT = '文章分类文章信息表';

-- 评论表，存储文章的评论信息
CREATE TABLE blog_comments (
    -- 评论 ID，自增主键
                               comment_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '评论的唯一标识，自增',
    -- 评论所属文章的 ID
                               article_id INT NOT NULL COMMENT '评论所属文章的 ID，关联 blog_articles 表',
    -- 评论者的用户 ID
                               user_id INT NOT NULL COMMENT '发表评论的用户 ID，关联 blog_users 表',
    -- 评论内容，以文本形式存储
                               comment_content TEXT NOT NULL COMMENT '评论的具体内容',
    -- 评论时间，默认当前时间
                               comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '评论发表的时间，默认值为发表时的时间',
    -- 父评论 ID，用于实现评论的嵌套
                               parent_comment_id INT COMMENT '父评论的 ID，用于实现评论的嵌套回复',
    -- 外键约束，关联评论所属文章的 ID
                               FOREIGN KEY (article_id) REFERENCES blog_articles(article_id),
    -- 外键约束，关联评论者的用户 ID
                               FOREIGN KEY (user_id) REFERENCES blog_users(user_id),
    -- 外键约束，关联父评论的 ID
                               FOREIGN KEY (parent_comment_id) REFERENCES blog_comments(comment_id)
) COMMENT = '文章分类文章评论信息表';

-- 分类表，存储文章的分类信息
CREATE TABLE blog_categories (
    -- 分类 ID，自增主键
                                 category_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '分类的唯一标识，自增',
    -- 分类名称，唯一且不能为空
                                 category_name VARCHAR(50) NOT NULL UNIQUE COMMENT '分类的名称，必须唯一'
) COMMENT = '文章分类文章分类信息表';

-- 文章与分类关联表，建立文章与分类的多对多关系
CREATE TABLE blog_article_categories (
    -- 文章 ID
                                         article_id INT NOT NULL COMMENT '文章的 ID，关联 blog_articles 表',
    -- 分类 ID
                                         category_id INT NOT NULL COMMENT '分类的 ID，关联 blog_categories 表',
    -- 联合主键，确保文章和分类的组合唯一
                                         PRIMARY KEY (article_id, category_id),
    -- 外键约束，关联文章 ID
                                         FOREIGN KEY (article_id) REFERENCES blog_articles(article_id),
    -- 外键约束，关联分类 ID
                                         FOREIGN KEY (category_id) REFERENCES blog_categories(category_id)
) COMMENT = '文章分类文章与分类关联表，用于实现多对多关系';