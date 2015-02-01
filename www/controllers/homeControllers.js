/**
 * Created by Ibrahim on 1/12/2015.
 */
angular.module('esn')
    .controller('HomeController', function ($scope, $http, $Auth) {
        $scope.data = {
            posts: {}
        };
        $scope.deletingPost = [];
        $scope.savingPost = [];

        $scope.new_post = "";
        $scope.selfPost = function ($user_id) {
            return $Auth.getUser('id') == $user_id;
        };
        $scope.inProcess = false;
        var loadData = function () {
            $scope.inProcess = true;
            return $http.post('http://imadevelopers.com/esn/posts/gethomeposts.json', {withCredentials: true})
                .success(function (data) {
                    if (data.result.success) {
                        $scope.data.posts = data.result.posts;
                        $scope.inProcess = false;
                    } else {
                        console.log(data);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        };
        loadData();
        var editable_post_id = -1;

        $scope.editPost = {
            content_id: null,
            removeFile: true
        };

        var resetFileStatus = function () {
            $scope.$fileStatus = {
                isUploaded: false,
                content_id: null,
                content_path: null
            };
            $scope.fileStatus = 'No file';
            $scope.isUploading = false;
        };

        resetFileStatus();


        $scope.uploadfile = function () {
            $scope.isUploading = true;
            $scope.fileStatus = 'Please wait while the file gets uploaded';
            var file = $scope.postFile;
            if (editable_post_id != -1) {
                file = $scope.editFile;
            }
            var uploadUrl = 'http://imadevelopers.com/esn/contents/uploadFile.json';
            var uploadData = fileUpload.uploadFileToUrl(file, uploadUrl);
            uploadData.then(function (result) {
                if (result != null && result.success) {
                    $scope.$fileStatus.isUploaded = true;
                    $scope.$fileStatus.content_id = result.content_id;
                    $scope.$fileStatus.content_path = result.content_path;
                    $scope.fileStatus = 'File Successfully Attached';
                } else {
                    $scope.fileStatus = result.message;

                }
                $scope.isUploading = false;
            });
        };

        $scope.addingPost = false;
        $scope.addPost = function ($_post) {
            $scope.addingPost = true;

            var $formData = {
                Post: {
                    post: $_post,
                    privacy_id: 1
                }
            };
            $http.post('http://imadevelopers.com/esn/posts/add.json', $formData, {withCredentials: true})
                .success(function (data) {
                    if (data.result.success) {
                        var $post = data.result.post;
                        $scope.data.posts.unshift($post);
                        $scope.new_post = "";
                        resetFileStatus();
                        $scope.addingPost = false;

                    }
                    else {
                        console.log(data);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        };


        $scope.isEditable = function ($post_id) {
            return $post_id == editable_post_id;
        };
        $scope.setEditable = function ($post_id) {
            editable_post_id = $post_id;
            resetFileStatus();
        };

        $scope.savePost = function ($post, $index) {
            $scope.savingPost[$post.id] = true;
            if ($scope.editPost.removeFile) {
                $post.content_id = null;
            } else if (!angular.isUndefined($scope.editPost.content_id) && $scope.editPost.content_id != null) {
                $post.content_id = $scope.editPost.content_id;
            }

            $http.post('http://imadevelopers.com/esn/posts/edit/' + $post.id + '.json', {'Post': $post}, {withCredentials: true})
                .success(function (data) {
                    if (data.result.success) {
                        editable_post_id = -1;
                        $scope.data.posts[$index] = data.result.post;
                        resetFileStatus();
                        $scope.savingPost[$post.id] = false;
                    } else {
                        console.log(data);
                        resetFileStatus();
                    }
                })
                .error(function (error) {
                    console.log(error);
                    resetFileStatus();
                });

        };

        $scope.deletePost = function (id, $index) {
            $scope.deletingPost[id] = true;
            $http.delete('http://imadevelopers.com/esn/posts/delete/' + id + '.json', {withCredentials: true})
                .success(function (data) {
                    if (data.result.success) {
                        $scope.deletingPost[id] = false;
                        $scope.data.posts.splice($index, 1);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        }
    }).
    controller('HomeEditPostController', function ($scope, $http, fileUpload) {
        var resetFileStatus = function () {
            $scope.$fileStatus = {
                isUploaded: false,
                content_id: null,
                content_path: null
            };
            $scope.fileStatus = 'No file';
            $scope.isUploading = false;
        };

        resetFileStatus();


        $scope.uploadfile = function () {
            $scope.isUploading = true;
            $scope.fileStatus = 'Please wait while the file gets uploaded';
            var file = $scope.postFile;
            var uploadUrl = 'http://imadevelopers.com/esn/contents/uploadFile.json';
            var uploadData = fileUpload.uploadFileToUrl(file, uploadUrl);
            uploadData.then(function (result) {
                if (result != null && result.success) {
                    $scope.$fileStatus.isUploaded = true;
                    $scope.$fileStatus.content_id = result.content_id;
                    $scope.$fileStatus.content_path = result.content_path;
                    $scope.fileStatus = 'File Successfully Attached';
                    $scope.editPost.content_id = result.content_id;
                } else {
                    $scope.fileStatus = result.message;

                }
                $scope.isUploading = false;
            });
        };

    });