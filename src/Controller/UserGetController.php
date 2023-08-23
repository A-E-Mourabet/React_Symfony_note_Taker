<?php
namespace App\Controller;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class UserGetController extends AbstractController{

    #[Route("/getUserId" , name:'get_user_id' , methods:"GET" )]

    public function GetUserId (UserRepository $userRepository) : JsonResponse
    {
        $user = $this->getUser();
        $user = $userRepository -> findConnectedUser($user->getUserIdentifier());
        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], 401);
        }
        $userId = $user->getId();
        return new JsonResponse(['user_id' => $userId]);

    }
}