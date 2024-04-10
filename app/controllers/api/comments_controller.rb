# app/controllers/api/comments_controller.rb
class Api::CommentsController < ApplicationController
  def index
    @comment = Comment.where(usgs_id: params[:feature_id])

    if @comment
      render json: @comment, status: :ok
    else
      render json: { error: "no se encontraron comentarios" }, status: :not_found
    end
  end

  def create
    # Parsear y filtrar los parámetros de la solicitud
    comment_params = params.require(:comment).permit(:usgs_id, :body)

    # Crear una nueva instancia de Comment con los parámetros filtrados
    @comment = Comment.new(comment_params)

    # Intentar guardar el comentario en la base de datos
    if @comment.save
      render json: @comment, status: :created
    else
      render json: { error: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
end


# private
#     # Only allow a list of trusted parameters through.
#   def comment_params
#     params.require(:comment).permit(:usgs_id, :body)
#   end
