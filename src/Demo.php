<?php

declare(strict_types=1);

namespace Src;

use DocxTemplate\Lexer\Contract\Ast\AstNode;
use DocxTemplate\Lexer\Exception\SyntaxError;
use DocxTemplate\Lexer\Lexer;
use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

class Demo
{
    private App $app;

    public function __construct()
    {
        $this->app = AppFactory::create();
        $this->configure();
    }

    public function run(): void
    {
        $this->app->run();
    }

    private function configure(): void
    {
        $this->app->get('/', static function (Request $request, Response $response, $args) {
            $response->getBody()->write(file_get_contents(__DIR__ . "/../assets/index.html"));
            return $response;
        });

        $this->app->post(
            '/api/ast/build',
            static function(Request $request, Response $response) {
                try {
                    $params = json_decode($request->getBody()->getContents());
                    if (!isset($params->content) || trim($params->content) === '') {
                        $data = [
                            'error' => 'Unknown parse content'
                        ];
                    } else {
                        $data = static::buildAst((string)$params->content);
                    }
                } catch (SyntaxError $error) {
                    $data['error'] = $error->getMessage();
                } catch (\Throwable $throwable) {
                    $data['error'] = 'Something wrong';
                }

               $response->withHeader('Content-type', 'application/json');
               $response->getBody()->write(json_encode($data));

               return $response;
            }
        );
    }

    /**
     * @param string $content
     * @return array
     * @throws SyntaxError
     */
    private static function buildAst(string $content): array
    {
        $lexer = new Lexer($content);
        $nodes = [];
        /** @var AstNode $block */
        foreach ($lexer->parse() as $block) {
            $nodes[] = $block->toArray();
        }

        return $nodes;
    }
}
