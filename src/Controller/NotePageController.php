<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NotePageController extends AbstractController
{
    #[Route('/notes', name: 'main_page')]
    public function index(): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        return $this->render('React/index.html.twig', [
            'controller_name' => 'NotePageController',
        ]);
    }
}
